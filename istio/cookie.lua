
          function envoy_on_response(response_handle)
            function set_cookie_header(rh)
              s = rh:headers():get("Set-Cookie")
              if string.find(s, "istioSession=" ) and not string.find(s, "SameSite") then
                s = s.."; SameSite=None; Secure"
              end
              return s
            end
            if response_handle:headers():get("Set-Cookie") then
              secure_cookie_header = set_cookie_header(response_handle)
              response_handle:headers():replace("Set-Cookie",secure_cookie_header)
            end
          end```




              response_handle:logInfo("Hello World.")
              request_handle:headers():add("request_body_size", request_handle:body():length())

              function set_cookie_header(rh)
                s = rh:headers():get("Set-Cookie")
                if string.find(s, "istioSession=" ) and not string.find(s, "SameSite") then
                  s = s.."; SameSite=None; Secure"
                end
                return s
              end
              if response_handle:headers():get("Set-Cookie") then
                secure_cookie_header = set_cookie_header(response_handle)
                response_handle:headers():replace("Set-Cookie",secure_cookie_header)
              end